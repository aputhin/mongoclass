const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
  it('can create a subdocument', (done) => {
    const joe = new User({ 
      name: 'Joe', 
      posts: [{ title: 'posttitle1' }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'posttitle1');
        done();
      });
  });

  it('can add subdocuments do an existing record', (done) => {
    const joe = new User({ 
      name: 'Joe', 
      posts: []
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts.push({ title: 'newpost' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'newpost');
        done();
      });
  });

  it('can remove an existing subdocument', (done) => {
    const joe = new User({ 
      name: 'Joe', 
      posts: [{ title: 'oldpost' }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        const post = user.posts[0];
        post.remove();
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
  });
});