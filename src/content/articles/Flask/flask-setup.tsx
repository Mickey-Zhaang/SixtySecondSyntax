import { ArticleTemplate } from '@/components';
import type { ArticleMeta } from '@/lib/types';

export const meta: ArticleMeta = {
	title: 'Flask App Setup in 60 Seconds',
	tags: ['flask', 'python', 'web'],
	date: '2026-03-16',
	excerpt: 'Get a Flask web server running with just a few lines of code.',
	order: 1,
	author: 'Mickey Zhang',
};

export const content = `
Flask is a lightweight Python web framework. Setting it up takes just a few minutes.

## Installation

\`\`\`bash
pip install flask
\`\`\`

## Basic app

Create \`app.py\`:

\`\`\`python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/user/<name>')
def greet_user(name):
    return f'Hello, {name}!'

if __name__ == '__main__':
    app.run(debug=True, port=5000)
\`\`\`

## Run it

\`\`\`bash
python app.py
\`\`\`

Visit \`http://localhost:5000\` in your browser. You'll see "Hello, World!".

Try \`http://localhost:5000/user/Alice\` → "Hello, Alice!"

## Key concepts

- **@app.route()** — Maps a URL to a function
- **debug=True** — Enables auto-reload on code changes
- **<name>** — URL parameter captured as function argument
- **if __name__ == '__main__':** — Only runs when executed directly, not imported

That's it! Flask handles HTTP requests, routing, and responses. Add more routes and you've got a web app.
`;

export default function FlaskSetup() {
	return <ArticleTemplate meta={meta} markdown={content} />;
}
