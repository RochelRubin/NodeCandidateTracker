const router = require('express').Router();
const candidateDb = require('../db/candidate-db');



router.get('/details', async (req, res) => {
    const candidate = await candidateDb.getById(req.query.id);
    res.render('candidates/details', { candidate });
});
router.get('/counts', async (req, res) => {
    const candidate = await candidateDb.statusCount();
    res.render('candidates/statuscount', { candidate });
});

router.post('/update', async (req, res) => {
    await candidateDb.update(req.body);
    res.redirect('/candidates');
});


router.get('/pending', async (req, res) => {
    const pending = await candidateDb.getCandidates(0);
    res.render('candidates/pending', { pending });
});
router.get('/confirmed', async (req, res) => {
    const confirmed = await candidateDb.getCandidates(1);
    res.render('candidates/confirmed', { confirmed });
});
router.get('/refused', async (req, res) => {
    const refused = await candidateDb.getCandidates(2);
    res.render('candidates/refused', { refused });
});
router.post('/add', async (req, res) => {
    await candidateDb.add(req.body);
    res.redirect('/candidates');
});
router.get('/add', (req, res) => {
    res.render('candidate/add');
});

module.exports = router;
