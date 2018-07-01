var expect = require('expect');


var {generateMessage} = require('./message');


describe('generateMessage', () => {
  it('should generate correct message object', ()=>{
    var from = 'Jen';
    var text = 'Wanna get drinks?';
    var msg = generateMessage(from, text);

    expect(typeof msg.createdAt).toBe('number');
    expect(msg).toHaveProperty('from', from);
    expect(msg).toHaveProperty('text', text);
  })
})
