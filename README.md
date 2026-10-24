
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


Usage
-----

:TODO:



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
