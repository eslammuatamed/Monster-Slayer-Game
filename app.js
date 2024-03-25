Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      turns: [],
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      } else {
        return { width: this.monsterHealth + "%" };
      }
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      } else {
        return { width: this.playerHealth + "%" };
      }
    },
    hardAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "It's a draw!";
      } else if (value <= 0) {
        this.winner = "You lost!";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "It's a draw!";
      } else if (value <= 0) {
        this.winner = "You won!";
      }
    },
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      (this.winner = null), (this.turns = []);
    },
    mathWay(max, min) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    attackMonster() {
      const damage = this.mathWay(12, 5);
      this.monsterHealth -= damage;
      this.logGame("Player", "attack", damage);
      this.attackPlayer();
      this.currentRound++;
    },
    attackPlayer() {
      const damage = this.mathWay(15, 8);
      this.playerHealth -= damage;
      this.logGame("Monster", "attack", damage);
    },
    specialAttack() {
      const damage = this.mathWay(25, 10);
      this.monsterHealth -= damage;
      this.logGame("Player", "special attack", damage);
      this.attackPlayer();
      this.currentRound++;
    },
    healPlayer() {
      const heal = this.mathWay(20, 8);
      if (this.playerHealth + heal > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += heal;
      }
      this.logGame("Player", "heal", heal);
      this.currentRound++;
    },
    surrender() {
      this.winner = "You lost!";
    },
    logGame(who, what, value) {
      this.turns.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
}).mount("#game");
