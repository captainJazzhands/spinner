using System;
using System.Collections;
using System.IO;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using StroopShop.Controllers;

namespace StroopShop.Controllers;

[Controller]
[Route("api/[controller]")]
public class WordsController : Controller
{
	private readonly List<Word> _words = new List<Word>();

	[HttpGet]
	public ActionResult<List<Word>> Index()
	{
		return _words; //returns all words as… ?
	}

	[HttpGet("{PartOfSpeech}")]
	public ActionResult<Word> GetByResult(string partOfSpeech)
	{
		return Ok(_words.All(u => u.PartOfSpeech == partOfSpeech));
		// return Ok(_words.FirstOrDefault(u => u.PartOfSpeech == partOfSpeech));
	}

	[HttpGet("{Quantity}")]
	public ActionResult<Word> GetByResult(int quantity)
	{
		private string[] words_All = _words.All();
		return Ok(_words.All(u => u.Quantity = quantity));
	}

	[HttpPost]
	public ActionResult<Word> Insert([FromBody] Word word)
	{
		_words.Add(word);
		return word;
	}

	private string[] ActualFileContents = LocalFiles.Main("pronoun");

	public WordsController()
	{
		if (ActualFileContents.Length > 0)
		{
			for (int i = 0; i < ActualFileContents.Length; i++)
			{
				_words.Add(new Word()
				{
					TheWord = ActualFileContents[i].ToString()
				});
			}
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
