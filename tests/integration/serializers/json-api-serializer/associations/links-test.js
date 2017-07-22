import SerializerRegistry from 'ember-cli-mirage/serializer-registry';
import { Model, hasMany, belongsTo, JSONAPISerializer, Db } from 'mirage-server';
import { module, test } from 'qunit';
import { Schema } from 'mirage-server';

module('Integration | Serializers | JSON API Serializer | Associations | Links', {
  beforeEach() {
    this.schema = new Schema(new Db(), {
      wordSmith: Model.extend({
        blogPosts: hasMany()
      }),
      blogPost: Model.extend({
        wordSmith: belongsTo(),
        fineComments: hasMany()
      }),
      fineComment: Model.extend({
        blogPost: belongsTo()
      })
    });
  },
  afterEach() {
    this.schema.db.emptyData();
  }
});

test(`it can link to relationships, including data'`, function(assert) {
  let registry = new SerializerRegistry(this.schema, {
    application: JSONAPISerializer,
    blogPost: JSONAPISerializer.extend({
      links(model) {
        return {
          'wordSmith': {
            related: `/api/word_smiths/${model.wordSmith.id}`,
            self: `/api/blog_posts/${model.id}/relationships/word_smith`
          },
          'fineComments': {
            related: `/api/fine_comments?blog_post_id=${model.id}`,
            self: `/api/blog_posts/${model.id}/relationships/fine_comments`
          }
        };
      }
    })
  });

  let link = this.schema.wordSmiths.create({ id: 3, name: 'Link' }); // specify id to really test our links function
  let blogPost = link.createBlogPost({ title: 'Lorem ipsum' });

  let result = registry.serialize(blogPost);

  assert.deepEqual(result, {
    data: {
      type: 'blog-posts',
      id: blogPost.id,
      attributes: {
        'title': 'Lorem ipsum'
      },
      relationships: {
        'word-smith': {
          data: {
            id: "3",
            type: "word-smiths"
          },
          links: {
            related: `/api/word_smiths/${link.id}`,
            self: `/api/blog_posts/${blogPost.id}/relationships/word_smith`
          }
        },
        'fine-comments': {
          data: [],
          links: {
            related: `/api/fine_comments?blog_post_id=${blogPost.id}`,
            self: `/api/blog_posts/${blogPost.id}/relationships/fine_comments`
          }
        }
      }
    }
  });
});
