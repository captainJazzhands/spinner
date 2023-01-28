using System;
using System.Collections;
using System.IO;
using System.Text;
using Microsoft.VisualBasic;

namespace StroopShop.Controllers;

public static class LocalFiles
{
	public static string[] tempResult = Array.Empty<string>();

	public static string[] Main(string ArgPart)
	{
		var appDataDir = Environment.CurrentDirectory;
		var dataDir = Path.Combine(appDataDir, "data");
		var wordsPath = Path.Combine(dataDir, ArgPart + "s.txt");
		if (File.Exists(wordsPath))
		{
			string[] readLines = File.ReadAllLines(wordsPath);
			if (readLines.Length > 1)
			{
				tempResult = readLines;
			}
		}
		else
		{
			tempResult = Array.Empty<string>();
			return tempResult;
		}

		return tempResult;
	}
}
