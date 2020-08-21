const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const unified = require('unified');
const parse = require('remark-parse');
const stringify = require('remark-stringify');
const visit = require('unist-util-visit');
const { default: Axios } = require('axios');
const simpleGit = require('simple-git');
const git = simpleGit();

const toAst = (markdown) => {
  return unified().use(parse).parse(markdown);
};

const toMarkdown = (ast) => {
  return unified().use(stringify).stringify(ast);
};

const README = 'README.md' || 'readme.md';
const mainDir = '.';
const readme = readFileSync(join(mainDir, README), { encoding: 'utf8' });
const readmeAST = toAst(readme);
let LANG = 'I am Groot ';

visit(readmeAST, (node) => {
  if (
    (node.type === 'text' || node.type === 'inlineCode' || node.type === 'code') &&
    node.value !== '.' &&
    node.value !== ' '
  ) {
    node.value = LANG;
  }
});

writeFileSync(join(mainDir, README), toMarkdown(readmeAST), 'utf8');

async function commit() {
  const mail = await Axios.get(`https://api.github.com/users/${process.env.GITHUB_ACTOR}/events`);
  let email;
  let author;
  await mail.data.forEach((data) => {
    if (data.type === 'PushEvent') {
      email = data.payload.commits[0].author.email;
    } else {
      author = 'github-actions[bot]';
      email = '41898282+github-actions[bot]@users.noreply.github.com';
    }
  });

  await git.add('./*');
  await git.addConfig('user.name', author ? author : process.env.GITHUB_ACTOR);
  await git.addConfig('user.email', email);
  await git.commit('i am groot 🌳');
  await git.push();
}

try {
  commit();
} catch (error) {
  throw new Error(error);
}
