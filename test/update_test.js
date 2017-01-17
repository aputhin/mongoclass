const assert = require('assert');
const User = require('../src/user');

describe('Updates users', () => {
  "use strict";
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe', likes: 0 });
    joe.save()
      .then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
  }

  // setsave would be incremental
  it('instance type using set n save', (done) => {
    joe.set('name', 'Alex'); // only sets properties in memory, doesn't persist
    assertName(joe.save(), done);
  });

  // bulk updating
  it('a model instance can update', (done) => {
    assertName(joe.update({ name: 'Alex' }), done);
  });

  it('a model class can update', (done) => {
    assertName(
      User.update({ name: 'Joe' }, { name: 'Alex' }), 
      done
    );
  });

  it('a model class can update one record', (done) => {
    assertName(
      User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }),
      done
    );
  });

  it('a model class can find a record with and id and update it', (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, { name: 'Alex' }),
      done
    );
  });

  it('a user can have their likes inc by 1', (done) => {
    User.update({ name: 'Joe' }, { $inc: { likes: 10 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.likes === 10);
        done();
      });
  });
});