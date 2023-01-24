using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace StroopShop.Controllers

{
	[Controller]
	[Route("api/[controller]")]
	public class SwatchesController : Controller
	{
		private readonly List<Word> _words = new List<Word>();

		[HttpGet]
		public ActionResult<List<Word>> Index()
		{
			return _words; //returns all Swatches.
		}

		[HttpGet("{PartOfSpeech}")]
		public ActionResult<Word> GetByResult(string PartOfSpeech)
		{
			return Ok(_words.FirstOrDefault(u => u.PartOfSpeech == PartOfSpeech));
		}

		[HttpPost]
		public ActionResult<Word> Insert([FromBody] Word word)
		{
			_words.Add(word);
			return word;
		}

		public SwatchesController()
		{
			_words.Add(new Word()
			{
				TheWord = "Accept",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Guess",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Achieve",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Harass",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Add",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Hate",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Admire",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Hear",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Admit",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Help",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Adopt",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Hit",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Advise",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Hope",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Agree",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Identify",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Allow",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Interrupt",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Announce",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Introduce",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Appreciate",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Irritate",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Approve",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Jump",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Argue",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Keep",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Arrive",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Kick",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Ask",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Kiss",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Assist",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Laugh",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Attack",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Learn",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Bake",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Leave",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Bathe",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Lend",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Be",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Lie",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Beat",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Like",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Become",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Listen",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Beg",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Lose",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Behave",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Love",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Bet",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Make",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Boast",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Marry",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Boil",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Measure",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Borrow",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Meet",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Breathe",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Move",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Bring",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Murder",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Build",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Obey",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Burn",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Offend",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Bury",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Offer",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Buy",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Open",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Call",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Paint",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Catch",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Pay",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Challenge",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Pick",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Change",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Play",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Cheat",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Pray",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Chew",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Print",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Choose",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Pull",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Clap",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Punch",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Clean",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Punish",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Collect",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Purchase",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Compare",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Push",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Complain",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Quit",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Confess",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Race",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Confuse",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Read",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Construct",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Relax",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Control",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Remember",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Copy",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Reply",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Count",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Retire",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Create",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Rub",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Cry",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "See",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Damage",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Select",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Dance",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Sell",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Deliver",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Send",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Destroy",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Sing",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Disagree",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Snore",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Drag",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Stand",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Drive",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Stare",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Drop",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Start",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Earn",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Stink",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Eat",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Study",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Employ",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Sweep",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Encourage",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Swim",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Enjoy",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Take",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Establish",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Talk",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Estimate",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Teach",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Exercise",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Tear",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Expand",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Tell",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Explain",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Thank",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Fear",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Travel",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Feel",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Type",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Fight",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Understand",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Find",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Use",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Fly",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Visit",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Forget",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Wait",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Forgive",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Walk",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Fry",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Want",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Gather",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Warn",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Get",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Wed",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Give",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Weep",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Glow",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Wink",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Greet",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Worry",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Grow",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Write",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Yell",
				PartOfSpeech = "verb"
			});
			_words.Add(new Word()
			{
				TheWord = "Actor",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Gold",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Painting",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Advertisement",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Grass",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Parrot",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Afternoon",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Greece",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Pencil",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Airport",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Guitar",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Piano",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Ambulance",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Hair",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Pillow",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Animal",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Hamburger",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Pizza",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Answer",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Helicopter",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Planet",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Apple",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Helmet",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Plastic",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Army",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Holiday",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Portugal",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Australia",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Honey",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Potato",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Balloon",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Horse",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Queen",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Banana",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Hospital",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Quill",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Battery",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "House",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Rain",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Beach",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Hydrogen",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Rainbow",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Beard",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Ice",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Raincoat",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Bed",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Insect",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Refrigerator",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Belgium",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Insurance",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Restaurant",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Boy",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Iron",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "River",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Branch",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Island",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Rocket",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Breakfast",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Jackal",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Room",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Brother",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Jelly",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Rose",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Camera",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Jewellery",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Russia",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Candle",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Jordan",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Sandwich",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Car",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Juice",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "School",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Caravan",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Kangaroo",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Scooter",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Carpet",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "King",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Shampoo",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Cartoon",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Kitchen",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Shoe",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "China",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Kite",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Soccer",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Church",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Knife",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Spoon",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Crayon",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Lamp",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Stone",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Crowd",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Lawyer",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Sugar",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Daughter",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Leather",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Sweden",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Death",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Library",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Teacher",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Denmark",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Lighter",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Telephone",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Diamond",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Lion",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Television",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Dinner",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Lizard",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Tent",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Disease",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Lock",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Thailand",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Doctor",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "London",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Tomato",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Dog",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Lunch",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Toothbrush",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Dream",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Machine",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Traffic",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Dress",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Magazine",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Train",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Easter",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Magician",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Truck",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Egg",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Manchester",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Uganda",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Eggplant",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Market",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Umbrella",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Egypt",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Match",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Van",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Elephant",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Microphone",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Vase",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Energy",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Monkey",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Vegetable",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Engine",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Morning",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Vulture",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "England",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Motorcycle",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Wall",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Evening",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Nail",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Whale",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Eye",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Napkin",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Window",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Family",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Needle",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Wire",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Finland",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Nest",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Xylophone",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Fish",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Nigeria",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Yacht",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Flag",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Night",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Yak",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Flower",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Notebook",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Zebra",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Football",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Ocean",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Zoo",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Forest",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Oil",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Garden",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Fountain",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Orange",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Gas",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "France",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Oxygen",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Girl",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Furniture",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Oyster",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Glass",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Garage",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Ghost",
				PartOfSpeech = "noun"
			});
			_words.Add(new Word()
			{
				TheWord = "Accidentally",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Always",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Angrily",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Arrogantly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Badly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Beautifully",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Bitterly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Blindly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Boldly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Bravely",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Briefly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Busily",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Boastfully",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Boldly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Bashfully",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Brightly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Carefully",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Certainly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Clearly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Courageously",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Cruelly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Curiously",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Commonly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Calmly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Carelessly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Cautiously",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Cheerfully",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Cleverly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Closely",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Coaxingly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Colorfully",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Continually",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Correctly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Crossly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Daily",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Delightfully",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Easily",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Enthusiastically",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Eventually",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Exactly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Excitedly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Extremely",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Fairly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Faithfully",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Fast",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Foolishly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Fortunately",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Frankly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Generally",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Generously",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Gently",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Gracefully",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Gladly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Gleefully",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Gratefully",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Greatly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Greedily",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Happily",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Highly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Honestly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Hopelessly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Immediately",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Innocently",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Instantly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Interestingly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Jealously",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Joyfully",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Kindly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Keenly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Kiddingly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Kindheartedly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Kookily",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Knowingly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Knavishly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Lively",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Lazily",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Less",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Loudly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Lovingly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Loyally",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Loosely",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Madly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "More",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Mysteriously",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Naturally",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Nearly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Nervously",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Never",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Obediently",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Officially",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Often",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Openly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Painfully",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Patiently",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Politely",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Poorly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Positively",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Properly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Quickly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Quietly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Rarely",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Really",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Regularly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Reluctantly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Repeatedly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Rudely",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Sadly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Safely",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Seldom",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Selfishly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Seriously",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Silently",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Slowly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Softly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Sometimes",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Soon",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Strictly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Suddenly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Surprisingly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Sweetly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Terribly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Thankfully",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Thoughtfully",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Tomorrow",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Unexpectedly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Unfortunately",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Urgently",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Usually",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Valiantly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Very",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Violently",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Well",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Wisely",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Yearly",
				PartOfSpeech = "adverb"
			});
			_words.Add(new Word()
			{
				TheWord = "Abundant",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Accurate",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Addicted",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Adorable",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Adventurous",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Afraid",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Aggressive",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Alcoholic",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Alert",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Aloof",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Ambitious",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Ancient",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Angry",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Animated",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Annoying",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Anxious",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Arrogant",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Ashamed",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Attractive",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Auspicious",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Awesome",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Awful",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Abactinal",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Abandoned",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Abashed",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Abbreviated",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Aberrant",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Abhorrent",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Abiding",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Bad",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Bashful",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Beautiful",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Belligerent",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Beneficial",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Best",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Big",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Bitter",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Bizarre",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Black",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Blue",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Boring",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Brainy",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Bright",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Broad",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Broken",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Busy",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Barren",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Barricaded",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Barytic",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Basal",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Basaltic",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Baseborn",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Based",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Baseless",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Basic",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Bathyal",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Battleful",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Battlemented",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Batty",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Batwing",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Bias",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Calm",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Capable",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Careful",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Careless",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Caring",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Cautious",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Charming",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Cheap",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Cheerful",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Chubby",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Clean",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Clever",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Clumsy",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Cold",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Colorful",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Comfortable",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Concerned",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Confused",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Crowded",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Cruel",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Curious",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Curly",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Cute",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Damaged",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Dangerous",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Dark",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Deep",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Defective",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Delicate",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Delicious",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Depressed",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Determined",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Different",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Dirty",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Disgusting",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Dry",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Dusty",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Daft",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Daily",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Dainty",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Damn",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Damning",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Damp",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Dampish",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Darkling",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Darned",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Dizzy",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Early",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Educated",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Efficient",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Elderly",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Elegant",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Embarrassed",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Empty",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Encouraging",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Enthusiastic",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Exasperated",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Excellent",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Exciting",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Expensive",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Fabulous",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Fair",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Faithful",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Famous",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Fancy",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Fantastic",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Fast",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Fearful",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Fearless",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Fertile",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Filthy",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Foolish",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Forgetful",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Friendly",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Funny",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Gentle",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Glamorous",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Glorious",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Gorgeous",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Graceful",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Grateful",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Great",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Greedy",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Green",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Handsome",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Happy",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Harsh",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Healthy",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Heavy",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Helpful",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Hilarious",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Historical",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Horrible",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Hot",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Huge",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Humorous",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Hungry",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Ignorant",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Illegal",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Imaginary",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Impolite",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Important",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Impossible",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Innocent",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Intelligent",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Interesting",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Jealous",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Jolly",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Jovial",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Joyous",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Juicy",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Juvenile",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Kind",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Large",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Legal",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Light",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Literate",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Lithe",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Little",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Lively",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Lonely",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Loud",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Lovely",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Lucky",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Macho",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Magical",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Magnificent",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Massive",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Mature",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Mean",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Messy",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Modern",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Narrow",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Nasty",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Naughty",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Nervous",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "New",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Noisy",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Nutritious",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Obedient",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Obese",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Obnoxious",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Old",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Overconfident",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Peaceful",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Pink",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Polite",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Poor",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Powerful",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Precious",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Pretty",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Proud",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Quick",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Quiet",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Rapid",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Rare",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Red",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Remarkable",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Responsible",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Rich",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Romantic",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Royal",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Rude",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Scintillating",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Secretive",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Selfish",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Serious",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Sharp",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Shiny",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Shocking",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Short",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Shy",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Silly",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Sincere",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Skinny",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Slim",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Slow",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Small",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Soft",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Spicy",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Spiritual",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Splendid",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Strong",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Successful",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Sweet",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Talented",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Tall",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Tense",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Terrible",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Terrific",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Thick",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Thin",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Tiny",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Tactful",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Tangible",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Tasteful",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Tasty",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Teachable",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Teeming",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Temperate",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Tenable",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Tenacious",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Tender",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Tender-hearted",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Terrific",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Testimonial",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Thankful",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Thankworthy",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Therapeutic",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Thorough",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Thoughtful",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Ugly",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Unique",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Untidy",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Upset",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Victorious",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Violent",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Vulgar",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Warm",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Weak",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Wealthy",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Wide",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Wise",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Witty",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Wonderful",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Worried",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Young",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Youthful",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "Zealous",
				PartOfSpeech = "adjective"
			});
			_words.Add(new Word()
			{
				TheWord = "all",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "another",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "any",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "anybody",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "anyone",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "anything",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "as",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "aught",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "both",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "each",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "each other",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "either",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "enough",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "everybody",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "everyone",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "everything",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "few",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "he",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "her",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "hers",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "herself",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "him",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "himself",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "his",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "I",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "idem",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "it",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "its",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "itself",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "many",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "me",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "mine",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "most",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "my",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "myself",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "naught",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "neither",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "no one",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "nobody",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "none",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "nothing",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "nought",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "one",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "one another",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "other",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "others",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "ought",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "our",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "ours",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "ourself",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "ourselves",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "several",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "she",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "some",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "somebody",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "someone",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "something",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "somewhat",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "such",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "suchlike",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "that",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "thee",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "their",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "theirs",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "theirself",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "theirselves",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "them",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "themself",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "themselves",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "there",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "these",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "they",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "thine",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "this",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "those",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "thou",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "thy",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "thyself",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "us",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "we",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "what",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "whatever",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "whatnot",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "whatsoever",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "whence",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "where",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "whereby",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "wherefrom",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "wherein",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "whereinto",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "whereof",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "whereon",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "wherever",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "wheresoever",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "whereto",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "whereunto",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "wherewith",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "wherewithal",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "whether",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "which",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "whichever",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "whichsoever",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "who",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "whoever",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "whom",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "whomever",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "whomso",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "whomsoever",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "whose",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "whosever",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "whosesoever",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "whoso",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "whosoever",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "ye",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "yon",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "yonder",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "you",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "your",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "yours",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "yourself",
				PartOfSpeech = "pronoun"
			});
			_words.Add(new Word()
			{
				TheWord = "yourselves",
				PartOfSpeech = "pronoun"
			});
		}
	}
}


// let soundList: IButton[] = [
// 	{
// 		color: 'white',
// 		sound: {
// 			name: 'Malama',
// 			type: 'speech',
// 			pronunciation: 'mah lah ma',
// 			pitch: -4
// 		}
// 	},
// 	{
// 		color: 'gray',
// 		sound: {
// 			name: 'Yahweh',
// 			type: 'speech',
// 			pronunciation: 'yah wey',
// 			pitch: -3
// 		}
// 	},
// 	{
// 		color: 'yellow',
// 		sound: {
// 			name: 'Mr. Bits',
// 			type: 'speech',
// 			pronunciation: 'mister bits',
// 			pitch: -2
// 		}
// 	},
// 	{
// 		color: ['gray', 'white'],
// 		sound: {
// 			name: 'Mayday',
// 			type: 'speech',
// 			pronunciation: 'may day',
// 			pitch: -1
// 		}
// 	},
// 	{
// 		color: 'brown',
// 		sound: {
// 			name: 'Bae Bae',
// 			type: 'speech',
// 			pronunciation: 'bay bay',
// 			pitch: 0
// 		}
// 	},
// 	{
// 		color: 'red',
// 		sound: {
// 			name: 'Mr. Ball Legs',
// 			type: 'speech',
// 			pronunciation: 'mister ball legs',
// 			pitch: 1
// 		}
// 	},
// 	{
// 		color: 'black',
// 		sound: {
// 			name: 'Shaft',
// 			type: 'speech',
// 			pronunciation: 'bad mother fucker',
// 			pitch: 2
// 		}
// 	},
// 	{
// 		color: 'brown',
// 		sound: {
// 			name: 'Jeebus',
// 			type: 'speech',
// 			pronunciation: 'jeebus',
// 			pitch: 3
// 		}
// 	}
// ]

// Explanation:[Controller]
// [Route("api/[controller]")]
// public class SwatchesController : Controller
