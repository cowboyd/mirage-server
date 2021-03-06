import { RestSerializer, Db, Model, SerializerRegistry } from 'mirage-server';
import { hasMany, belongsTo } from 'mirage-server';
import { Schema } from 'mirage-server';
import { module, test } from 'qunit';

module('Integration | Serializer | RestSerializer', {
  beforeEach() {
    let db = new Db();
    this.schema = new Schema(db);
    this.schema.registerModels({
      wordSmith: Model.extend({
        blogPosts: hasMany()
      }),
      blogPost: Model.extend({
        wordSmith: belongsTo()
      })
    });

    let link = this.schema.wordSmiths.create({ name: 'Link', age: 123 });
    link.createBlogPost({ title: 'Lorem' });
    link.createBlogPost({ title: 'Ipsum' });

    this.schema.wordSmiths.create({ name: 'Zelda', age: 230 });

    this.registry = new SerializerRegistry(this.schema, {
      application: RestSerializer,
      wordSmith: RestSerializer.extend({
        attrs: ['id', 'name'],
        include: ['blogPosts']
      }),
      blogPost: RestSerializer.extend({
        include: ['wordSmith']
      })
    });
  },

  afterEach() {
    this.schema.db.emptyData();
  }
});

test('it sideloads associations and camel-cases relationships and attributes correctly for a model', function(assert) {
  let link = this.schema.wordSmiths.find(1);
  let result = this.registry.serialize(link);

  assert.deepEqual(result, {
    wordSmith: {
      id: '1',
      name: 'Link',
      blogPosts: ['1', '2']
    },
    blogPosts: [
      {
        id: '1',
        title: 'Lorem',
        wordSmith: '1'
      },
      {
        id: '2',
        title: 'Ipsum',
        wordSmith: '1'
      }
    ]
  });
});
