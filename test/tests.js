var request = require('supertest');
var should = require('should');

var PouchDB = require('pouchdb');
var ThaliAclDb = require('thali-acl');
var ThaliMiddleware = require('../.');

var express = require('express');
var app = express();

