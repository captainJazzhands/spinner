using System.Data.SqlTypes;
using System.Drawing;

namespace StroopShop.Controllers;

public class Pallet
{
	public int AddLargeNumbers(int number1, int number2)
	{
		if ((number1 > 1000) && (number2 > 1000))
		{
			return number1 + number2;
		}

		return 0;
	}

	public Color OneColor { get; set; }

	// public Array PileOfColors()

	public Color _color { get; set; }

	public Color[] _poc;
}

public class Pallets
{
	public Color OneColor { get; set; }

	public Color[] OnePallet { get; set; }

	public Array AllPallets()
	{
		var _pallets = new Pallets();
		var aotp = new Color[] { _pallets.OnePallet[0] };
		return aotp;
	}
}
