import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const db = new Low(new JSONFile('db.json'))
await db.read()

db.data ||= { posts: [] } 
// db.data.posts.push('hello world')
const posts = db.data.posts


// use postOne as the basis for a js class
class Post {
    constructor(title, content, published) {
        this.title = title
        this.content = content
        this.published = published
    }

    // add a method to push the post to the db
    async push() {
        await db.data.posts.push(this)
        await db.write()
    }
}

// create a new post object
const postOne = new Post('Hello World', 'This is my first post!', true)
const postTwo = new Post('Hello Second', 'This is my second post!', true)
postOne.push()
postTwo.push()

// await db.write()
