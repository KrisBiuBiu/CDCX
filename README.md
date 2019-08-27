# CDCX

# This is a webSite Build With Koa2, It can show you how to build a simple and complete website using koa2

# Attention
I saved the login account and password in the background in config.js, but in fact, it is only convenient for the use of the user. In the actual project, important information such as account and password will not appear in the configuration file, because it is dangerous. By doing so, your server will be attacked!

#Remember, don't put important information in the configuration file！

# Precautions
Before you execute npm install, please check the package.json in the root directory to confirm which modules are unnecessary. Please remove them from the file. This will make your project smaller and reduce redundancy. The rest of the code.

Package.json Please refer to http://www.ruanyifeng.com/blog/2017/08/koa.html

# start
1 npm install
2 node server.js

# About data dir
Schema is mainly used to define the structure of the document document in the Collection Collection in MongoDB. It can be understood as the definition of the table structure by mongoose (not only the structure and properties of the document can be defined, but also the instance method, static model method, composite index, etc. of the document can be defined. ), each schema will be mapped to a collection in mongodb, schema does not have the ability to manipulate the database.
