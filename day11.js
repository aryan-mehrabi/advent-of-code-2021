const R = require("ramda");

const input = `4836484555
4663841772
3512484556
1481547572
7741183422
8683222882
4215244233
1544712171
5725855786
1717382281`;

const parsingData = (data) => {
  return data.split("\n").map((e) => e.split("").map((e) => Number(e)));
};

const flashedToZero = (arr) => {
  let syncFlash = true;
  const [energyLvls, flashes] = arr;
  const newEnergy = energyLvls.map((x) =>
    x.map((energy) => {
      if (!energy) return 0;
      else {
        syncFlash = false;
        return energy;
      }
    })
  );
  return [newEnergy, flashes, syncFlash];
};

const flashing = (arr) => {
  let [energyLvls, flashes] = arr;
  const flash = (energyLvls, i, j) => {
    if (!energyLvls[i][j] || energyLvls[i][j] < 10) return;

    flashes++;
    energyLvls[i][j] = undefined;

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (x === 0 && y === 0) continue;

        if (
          energyLvls[i + x] === undefined ||
          energyLvls[i + x][j + y] === undefined
        )
          continue;

        energyLvls[i + x][j + y]++;
        flash(energyLvls, i + x, j + y);
      }
    }
  };

  for (let i = 0; i < energyLvls.length; i++) {
    for (let j = 0; j < energyLvls[i].length; j++) {
      const energy = energyLvls[i][j];
      if (energy === 10) {
        flash(energyLvls, i, j);
      }
    }
  }
  return [energyLvls, flashes];
};

const increaseEnergy = (energyLvls, flashes) => {
  const newEnergyLvls = energyLvls.map((x) =>
    x.map((energy) => {
      return energy + 1;
    })
  );
  return [newEnergyLvls, flashes];
};

const performStep = (energyLvls, flashes) => {
  return R.pipe(increaseEnergy, flashing, flashedToZero)(energyLvls, flashes);
};

const totalFlashes = (energyLevels, steps) => {
  let energyLvls = R.clone(energyLevels);
  let i = 0;
  let flashes = 0;
  let syncFlash;
  while (i < steps) {
    [energyLvls, flashes, syncFlash] = performStep(energyLvls, flashes);
    if (syncFlash) return i + 1;
    i++;
  }
  return flashes;
};

console.log(totalFlashes(parsingData(input), 400));
