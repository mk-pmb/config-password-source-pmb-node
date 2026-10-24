// -*- coding: utf-8, tab-width: 2 -*-

import getOwn from 'getown';
import mustBe from 'typechecks-pmb/must-be.js';
import nodeFsPr from 'fs/promises';


const optDescr = 'password option value';

function stripBom(s) { return (s.startsWith('\uFEFF') ? s.slice(1) : s); }
function unbase64(s) { return Buffer.from(s, 'base64').toString('UTF-8'); }


const EX = async function retrievePassword(spec) {
  mustBe('str', optDescr)(spec);
  const sourceType = (/^(\w+):/.exec(spec) || false)[1];
  if (sourceType === 'empty') { return ''; }
  const reader = getOwn(EX.readers, sourceType);
  if (!reader) { throw EX.errBadSourceType(sourceType, spec.length); }
  const details = spec.slice(sourceType.length + 1);
  const pwsd = await reader(details);
  mustBe.nest('Raw password retrieved from source type ' + sourceType, pwsd);
  return pwsd;
};


function invalidDirectSource() {
  throw new Error('This password source is not meant to be called directly!');
}

function splitLines(s) { return s.split(/[\r\n]+/); }


const rd = {
  // Quick direct sources
  empty: invalidDirectSource,
  env(varName) { return getOwn(process.env, varName); },
  verbatim: String,

  // Async direct sources
  async utf8file(path) { return nodeFsPr.readFile(path, 'UTF-8'); },

  // Refining sources
  async base64(spec) { return unbase64(await EX(spec)); },
  async firstLine(spec) { return splitLines(await EX(spec))[0]; },
  async json(spec) { return JSON.parse(await EX(spec)); },
  async lastLine(spec) { return splitLines(await EX(spec)).slice(-1)[0]; },
  async trim(spec) { return stripBom(await EX(spec)).trim(); },
  async uri(spec) { return decodeURIComponent(await EX(spec)); },
};



Object.assign(EX, {

  readers: rd,

  errBadSourceType(srcType, pwLen) {
    const msg = ((srcType ? 'Invalid' : 'No') + ' password source type given.'
      + ' The ' + optDescr + ' received is ' + pwLen + ' characters long.'
      + " If you tried to give a plain password and that's its length,"
      + ' you forgot to write "verbatim:" in front.'
      + ' Supported password source types are: '
      + Object.keys(rd).sort().join(', '));
    const err = new Error(msg);
    return err;
  },

});


export default EX;
