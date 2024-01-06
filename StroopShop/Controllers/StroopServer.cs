using System;
using System.Collections;
using System.IO;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using StroopShop.Controllers;
using static StroopShop.Controllers.LocalFiles;

namespace StroopShop.Controllers;

[Controller]
[Route("api/[controller]")]

public class ColorsController : Controller
{
	private readonly List<Pallets> _colors = new List<Pallets>();
}

public class WordsController : Controller
{
	private readonly List<Word> _words = new List<Word>();
	private readonly List<string> _partslist = new List<string>();
	public static string _part_of_speech = "";
	public string[] _fileContents;

	[HttpGet]
	public ActionResult<List<Word>> Index()
	{
		_partslist.Add("noun");
		_partslist.Add("verb");
		_partslist.Add("adverb");
		_partslist.Add("adjective");
		_partslist.Add("pronoun");
		_partslist.Add("preposition");

		foreach (var speechpart in _partslist)
		{
			_fileContents = Main(speechpart);
			if (_fileContents.Length > 0)
			{
				foreach (var w in _fileContents)
				{
					_words.Add(new Word()
					{
						TheWord = w,
						PartOfSpeech = speechpart
					});
				}
			}
		}

		return _words; //returns all words as… ?
	}

	[HttpGet("{PartOfSpeech}")]
	public ActionResult<List<Word>> GetByResult(string partOfSpeech)
	{
		//	is unsafe user content!
		_part_of_speech = partOfSpeech.ToString();
		_fileContents = Main(_part_of_speech);

		if (_fileContents.Length <= 0) return _words;
		foreach (var word in _fileContents)
		{
			_words.Add(new Word()
			{
				TheWord = word,
				PartOfSpeech = _part_of_speech
			});
		}

		Console.WriteLine(_words.Count + _part_of_speech);

		return _words;
		// return Ok(_words.FirstOrDefault(u => u.PartOfSpeech == _part_of_speech));
	}

	[HttpPost]
	public ActionResult<Word> Insert([FromBody] Word word)
	{
		_words.Add(word);
		return word;
	}
}

// Explanation:[Controller]
// [Route("api/[controller]")]
// public class SwatchesController : Controller
