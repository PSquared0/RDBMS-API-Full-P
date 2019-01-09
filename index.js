const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());

// INSERT INTO cohorts (color, perc_used) VALUES ('red', .9)
server.post('/cohorts', (req, res) => {
  const cohorts = req.body;
  db('cohorts').insert(cohort)
  .then(ids => {
    res.status(201).json(ids);
  })
  .catch(err => {
    res.status(500).json({err: 'Failed to insert cohort'});
  });
});

// SELECT * FROM cohorts;
server.get('/cohorts', (req, res) => {
  db('cohorts').then(rows => {
    res.json(rows);
  }).catch(err => {
    res.status(500).json({err: 'Failed to find cohorts'});
  });
});

// SELECT * FROM cohorts WHERE id = 1
server.get('/cohorts/:id', (req, res) => {
  const {id} = req.params;
  db('cohorts').where('id', id)
  .then(rows => {
    res.json(rows);
  }).catch(err => {
    res.status(500).json({err: 'Failed to find cohort'});
  })
});

server.put('/cohorts/:id', (req, res) => {
  const {id} = req.params;
  const cohort = req.body;

  db('cohorts').where('id', id).update(cohort)
  .then(rowCount => {
    res.json(rowCount);
  })
  .catch(err => {
    res.status(500).json({err: 'Failed to update cohort'});
  });
});

// DELETE FROM cohorts WHERE id = 1
server.delete('/cohorts/:id', (req, res) => {
  const {id} = req.params;
  db('cohorts').where('id', id).del()
  .then(rowCount => {
    res.status(201).json(rowCount);
  }).catch(err => {
    res.status(500).json({err: 'Failed to delete cohort'});
  });
});


const port = 3000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
