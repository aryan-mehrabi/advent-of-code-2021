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
    // debugger
    if (!energyLvls[i][j] || energyLvls[i][j] < 10) return;

    flashes++;
    energyLvls[i][j] = undefined;
    if (i - 1 > -1) {
      energyLvls[i - 1][j]++;
      flash(energyLvls, i - 1, j);
      if (j - 1 > -1) {
        energyLvls[i - 1][j - 1]++;
        flash(energyLvls, i - 1, j - 1);
      }
      if (j + 1 < energyLvls[0].length) {
        energyLvls[i - 1][j + 1]++;
        flash(energyLvls, i - 1, j + 1);
      }
    }
    if (i + 1 < energyLvls.length) {
      energyLvls[i + 1][j]++;
      flash(energyLvls, i + 1, j);
      if (j - 1 > -1) {
        energyLvls[i + 1][j - 1]++;
        flash(energyLvls, i + 1, j - 1);
      }
      if (j + 1 < energyLvls[0].length) {
        energyLvls[i + 1][j + 1]++;
        flash(energyLvls, i + 1, j + 1);
      }
    }
    if (j - 1 > -1) {
      energyLvls[i][j - 1] += 1;
      flash(energyLvls, i, j - 1);
    }
    if (j + 1 < energyLvls[0].length) {
      energyLvls[i][j + 1] += 1;
      flash(energyLvls, i, j + 1);
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
    if(syncFlash) return i + 1;
    i++;
  }
  return flashes;
};

console.log(totalFlashes(parsingData(input), 300));