var expect = require('expect');

var {genMessage} = require('./message');

describe('genMessage', () => {
  it('should generate correct message object', () => {
      var from = 'Jen';
      var text = 'Some message';
      var message = genMessage(from, text);

      expect(message.createdAt).toBeA('number');
      expect(message).toInclude({from,text});
  });
});
