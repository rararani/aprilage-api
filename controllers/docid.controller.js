'use strict';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { connectedToApi, connectedToDatabase } from '../models/healthCheck.model.js';

import db from '../services/db.js';
import _ from 'lodash';
import { objectToCamelCase } from '../models/base.model.js';
import userModel from '../models/user2.model.js'
import agingDocModel from '../models/agingDocument.model.js';

/*******************************************************************************
GET /users/:email/documents/:docID
*******************************************************************************/
export const retrieveAgingDoc = async (req, res, next) => {
  try {

    const docID = req.params.docID;
    const email = req.params.email;
    const agingDoc = await agingDocModel.findById(docID);
    const user = await userModel.findByEmail(email);

    const sql = 'SELECT agingDocument.* FROM agingDocument WHERE userID = ?';
      const result = await db.raw(sql, [user.id]).then((sqlResults) => {
        return(objectToCamelCase(sqlResults[0]));
      });

    var found = false;

    for (var k in result) {
      if (result[k].id == docID) {
        found = true;
        break
      }
    }

    if (agingDoc == undefined) {
        res.status(404).send("Error 404: Aging Document not found.")
    }
    else if (!found){
        res.status(403).send("Error 403: Document does not belong to user.")
    }
    else {
      return res.json(agingDoc);
    }
    
  } catch(err) {
    next(err);
  }
};

/*******************************************************************************
DELETE /users/:email/documents/:docID
*******************************************************************************/
export const removeAgingDoc = async (req, res, next) => {
  try {
    const connectedToDatabaseResult = await connectedToDatabase();

    return res.json({ 
      connected: connectedToDatabaseResult,
      deletionStatus: true,
      status: 'Deleted aging doc.'
    });
  } catch(err) {
    next(err);
  }
};


/*******************************************************************************
GET /users/:email/documents/:docID/points
*******************************************************************************/
export const points = async (req, res, next) => {
  try {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const path = 'test.jpg';
    res.sendFile(path, {root: __dirname});
  } 
  catch(err) {
    next(err);
  }
};

/*******************************************************************************
POST /users/:email/documents/:docID/aging
*******************************************************************************/
export const aging = async (req, res, next) => {
  try {
    const connectedToDatabaseResult = await connectedToDatabase();
    return res.json({ 
      connected: connectedToDatabaseResult,
      status: "Requested AprilAge API to age image."
    });
  } catch(err) {
    next(err);
  }
};

/*******************************************************************************
GET /users/:email/documents/:docID/status
*******************************************************************************/
export const status = async (req, res, next) => {
  try {
    const connectedToDatabaseResult = await connectedToDatabase();
    return res.json({ 
      connected: connectedToDatabaseResult,
      status: "Returns the status of an aging document"
    });
  } catch(err) {
    next(err);
  }
};