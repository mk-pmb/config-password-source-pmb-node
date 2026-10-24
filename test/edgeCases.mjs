// -*- coding: utf-8, tab-width: 2 -*-

import testUtil from './libTestUtil.mjs';

const st = testUtil.simpleTest;
const errs = testUtil.knownErrorMessages;

st({ spec: 'empty:Arguments should be ignored', result: '' });

st({ spec: ':', rejects: errs.noSourceType });
st({ spec: 'EmpTy:', rejects: errs.invalidSourceType });
st({ spec: ' empty:', rejects: errs.noSourceType });
st({ spec: ' :empty:', rejects: errs.noSourceType });
st({ spec: 'utf-8-file:dummy.txt', rejects: errs.noSourceType });

st({ spec: 'env:', rejects: errs.notNeSt });
st({ spec: 'utf8file:', rejects: errs.noSuchFile });

const shnex = 'ShouldNotExist';
st({ spec: 'env:' + shnex, rejects: errs.notNeSt });
st({ spec: 'utf8file:' + shnex + '.txt', rejects: errs.noSuchFile });
st({ spec: 'utf8file:fixtures/empty.txt', rejects: errs.notNeSt });

st({ spec: 'base64:verbatim:$eW%9sMAo=', result: 'yol0\n' }); /*
  It seems node.js Buffer ignores garbage in input. Out of project scope. */












/* scroll */
