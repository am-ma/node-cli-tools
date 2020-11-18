#! /usr/bin/env node
'use strict';

const { Octokit } = require("@octokit/rest");
const dotEnv = require('dotenv').config();
const fs = require("fs");
const csv = require('csv');

const octokit = new Octokit({auth: dotEnv.parsed.ACCESS_TOKEN});
const args = process.argv.slice(2);

const IDX_TITLE = 0;
const COMMEND_KEYS = [
    'title',
    'labels',
    'body',
    'milestone',
    'assignee',
    'project',
];

const parser = csv.parse((err, data) => {
    const parameters = data.slice(1).map((row, idx) => {
        if (row[IDX_TITLE] === '') {
            return null;
        }
        if (row.length !== COMMEND_KEYS.length) {
            throw new Error('列の数合いません');
        }

        // -t="hogehoge" -b="hugahuga" ...
        const params = {
            owner: args[1],
            repo: args[2],
            title: '',
        };
        row.map((col, idx) => {
            if (col === '') {
                return '';
            }

            let key = COMMEND_KEYS[idx];
            if (key === 'labels') {
                params[key] = col.split(',');
            } else {
                params[key] = col;
            }
        });

        return params;
    });
    parameters.map((params, idx) => {
        if (params === null) {
            console.log(`row: ${idx} titleが空なので飛ばします`);
            return;
        }
        octokit.issues.create(params).then(({data}) => {
            console.log(data);
        }).catch(error => {
            console.log(error);
        });
    });
});

fs.createReadStream(args[0])
    .pipe(parser);