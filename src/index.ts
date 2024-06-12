import LavaBusiness from "./LavaBusiness/LavaBusiness";

const lava = new LavaBusiness('851d517b-3483-4267-a81e-cb3a754832d0', '91a0e51d279b0f37c48f7bba15b163b35e4f3363');

const tariffs = lava.payoff.getTariffs()
tariffs.then((result) => console.log(result))