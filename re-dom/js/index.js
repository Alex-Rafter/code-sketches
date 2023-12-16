import register from 'preact-custom-element'
import { Message } from 'ui/Message.js'

register(Message, 'hello-world', ['message'], { shadow: false });
