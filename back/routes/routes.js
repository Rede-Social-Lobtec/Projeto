var express = require("express")
var app = express();
var router = express.Router();

var groupService = require("../services/GroupService");
var userService = require("../services/UserService");
var postService = require("../services/PostService");
var logSessaoService = require("../services/LogSessaoService");

const { auth } = require("../services/UserService");

router.post('/user', userService.create);
router.get('/users', userService.getAll);
router.get('/user/:id', userService.findById);
router.get('/users/:nome', userService.findByName);
router.delete('/user/:id', auth, userService.delete);
router.put('/user/:id', auth, userService.update);
router.post('/auth', userService.token);
router.put('/user', auth, userService.manageFollowing);
router.get('/user', auth, userService.getSocialInfo)

router.get('/logs', logSessaoService.numSessao);

router.post('/group', auth, groupService.create);
router.get('/groups', groupService.getAll);
router.get('/group/:id', groupService.findById);
router.get('/groups/:nome', groupService.findByName);
router.delete('/group/:id', auth, groupService.delete);
router.put('/group/:id', auth, groupService.update);
router.put('/group/:id_group/member/:id_user', auth, groupService.manageMember);

router.post('/post', auth, postService.create);
router.get('/posts', postService.getAll);
router.get('/post/:id', postService.findById);
router.get('/posts/getLikes/:id', auth, postService.getAllLikes)
router.delete('/post/:id', auth, postService.delete);
router.put('/post/:id', auth, postService.update);
router.put('/post/addLike/:id', auth, postService.manageLike);
router.put('/post/addComment/:id', auth, postService.addComment);
router.put('/post/:id_post/comment/:id_comment', auth, postService.deleteComment);
router.get('/posts/', auth, postService.getPostsByUserId);
router.put('/tema', postService.countTema);
router.get('/tema', postService.getMaxTema);

module.exports = router;
