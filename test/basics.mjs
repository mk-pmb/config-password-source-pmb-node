// -*- coding: utf-8, tab-width: 2 -*-

import testUtil from './libTestUtil.mjs';

const st = testUtil.simpleTest;
const errs = testUtil.knownErrorMessages;

st({ spec: '', rejects: errs.noSourceType });
st({ spec: 'empty', rejects: errs.noSourceType });
st({ spec: 'empty:', result: '' });

st({ spec: 'bruteForce:', rejects: errs.invalidSourceType });

st({ spec: 'verbatim:yol0', result: 'yol0' });
st({ spec: 'base64:verbatim:eW9sMAo=', result: 'yol0\n' });
st({ spec: 'trim:base64:verbatim:eW9sMAo=', result: 'yol0' });

st({ spec: 'env:CI_TOKEN', setEnv: { CI_TOKEN: 'yol0' }, result: 'yol0' });
st({ spec: 'env:CI_TOKEN', setEnv: { CI_TOKEN: '' }, rejects: errs.notNeSt });

st({ spec: 'json:verbatim:"\\uD83D\\uDD11"', result: '🔑' });
st({ spec: 'json:verbatim:{"password":"xx"}', rejects: errs.notNeSt });













/* scroll */
