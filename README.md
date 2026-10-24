
<!--#echo json="package.json" key="name" underline="=" -->
config-password-source-pmb
==========================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Read a password from the source specified in your config file.
<!--/#echo -->


Why?
----

To help keep passwords separate from config.
Usually, config should be tracked in git, but passwords shouldn't,
so they should instead have their own file.



API
---

This module exports one function:

### async retrievePassword(spec)

`spec` is a string that defines where to find the actual password.
It starts with the source type name, then a colon, then the argument(s).
The colon is mandatory even without arguments.


Supported source types
----------------------

### Direct sources

* `empty`: Will always return the empty string, and it is the only source that
  is allowed to yield an empty password.
  Example: `empty:`

* `env`: The argument is the name of the environment variable that holds the
  password. Note that on most operating systems, environment variables can be
  spied on, so this is not a safe method to store a password.
  Useful for working in setups where some mechanism outside your control
  already puts the password into the environment anyway.
  Example: `env:CI_TOKEN`

* `utf8file`: The argument is the path to a UTF-8 encoded file from which
  to read the password. Will read the entire file, including any whitespace,
  so you may want to use it with `trim`.
  Example: `utf8file:cfg.@local/secrets/database.pswd`

* `verbatim`: The password is stored directly in the `spec`.
  This usually defeats the purpose of this module, but can still be useful
  in example code or when the password is trivial anyway.
  Example: `verbatim:1234` or `verbatim:anonymous@ftp.example.net`


### Refining sources

These source refine the text obtained from another source.

* `base64`: JSON-decode the argument, which should be a JSON-encoded string.
  Useful to transport Unicode emoji through ASCII-only channels.
  Example: `json:utf8file:cfg.@local/secrets/database.json`
  or `json:env:STRINGIFIED_PASSWORD`

* `firstLine`: Keep only the first line, without EOL if any (CR or NL or both).
  Example: `firstLine:utf8file:cfg.@local/secrets/database.pswd`

* `json`: JSON-decode the argument, which should be a JSON-encoded string.
  Useful to transport Unicode emoji through ASCII-only channels.
  Example: `json:utf8file:cfg.@local/secrets/database.json`
  or `json:env:STRINGIFIED_PASSWORD`

* `lastLine`: Keep only the last line, without EOL if any (CR or NL or both).
  Example: `lastLine:utf8file:cfg.@local/secrets/database.login.txt`

* `trim`: Discard leading and trailing whitespace.
  Example: `trim:utf8file:cfg.@local/secrets/database.pswd`

* `uri`: Decode `%xx` hex escapes as used in Uniform Resource Identifiers.
  Example: `uri:verbatim:%F0%9F%94%91`



Usage
-----

See the [basic tests](test/basics.mjs) or search for `retrievePassword`
in [`initPool.mjs` from `postgres-pool-pmb`][pgpool-init].

  [pgpool-init]: https://github.com/mk-pmb/postgres-pool-pmb-js/blob/master/src/initPool.mjs



Provenance
----------

This module was factored out from `postgres-pool-pmb` v0.1.2 and thus
started as a direct import of [`src/parseAndLoadPswd.mjs`][pgpool-loadpswd].

  [pgpool-loadpswd]: https://github.com/mk-pmb/postgres-pool-pmb-js/blob/719cbd08b3057ad50e3ae89151fa020b970e775d/src/parseAndLoadPswd.mjs



Known issues
------------

* Needs more/better tests and docs.





<!--#toc stop="scan" -->

&nbsp;


License
-------
<!--#echo json="package.json" key="license" -->
ISC
<!--/#echo -->
