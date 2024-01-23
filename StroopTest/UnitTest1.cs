using System.Drawing;
using StroopShop.Controllers;
using StroopTest;

namespace StroopTest;

[TestClass]
public class UnitTest_Pallets
{
	[TestMethod]
	public void Test_Pallets_Bool()
	{
		// bool result = StroopShop.Controllers.WordsController._part_of_speech.StartsWith('e');
		Array result = new StroopShop.Controllers.Pallets().OnePallet;
		bool answer;
		if (result?.ToString() != null)
		{
			answer = (result?.ToString()?.Length > 0);
		}
		else
		{
			answer = true;
		}

		Assert.IsTrue(answer);
	}
	[TestMethod]

	public void Test_Pallets_Count()
	{
		// bool result = StroopShop.Controllers.WordsController._part_of_speech.StartsWith('e');
		Array result = new StroopShop.Controllers.Pallets().OnePallet;
		int answer;
		if (result.Length > 0)
		{
			answer = result.Length;
		}
		else
		{
			answer = 0;
		}

		Assert.AreEqual(8, answer);
	}
}
