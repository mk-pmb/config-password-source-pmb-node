// -*- coding: utf-8, tab-width: 2 -*-

import test from 'p-tape';
import testPromise from 'rejected-or-not';

import pswd from '../pwsrc.mjs';

function isStr(x, no) { return (((typeof x) === 'string') || no); }
function wrapReject(pr, err) { return testPromise.rejects(() => pr, err); }


const EX = {

  oneLineJson(x) { return JSON.stringify(x, null, 2).replace(/\n */g, ' '); },

  knownErrorMessages: {
    invalidSourceType: 'Invalid password source type given',
    noSourceType: 'No password source type given',
    notNeSt: ' must be nonEmpty str ',
  },

  async simpleTest(how) {
    const name = EX.oneLineJson(how);
    let { rejects } = how;
    if (isStr(rejects)) { rejects = new RegExp(rejects); }
    test(name, async (t) => {
      t.plan(1);
      Object.assign(process.env, how.setEnv);
      let pr = pswd(how.spec);
      if (rejects) { pr = wrapReject(pr, rejects); }
      const result = await pr;
      if (rejects) { return t.ok(true); }
      t.strictEqual(result, how.result);
    });
  },


};


export default EX;
