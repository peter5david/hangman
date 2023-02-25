import React, { useState, useEffect } from 'react';
import Markdown from 'markdown-to-jsx';

// help functio use markdown to jsx to display the help from the readme.md
function Help() {
    const file_name = 'react_pinterest_clone.md';
    const [post, setPost] = useState('');

    useEffect(() => {
        import(`./readme.md`)
            .then(res => {
                fetch(res.default)
                    .then(res => res.text())
                    .then(res => setPost(res))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    });

    return (
        <div className="getHelp">
            <Markdown>
                {post}
            </Markdown>
        </div>
    );
}

export default Help;