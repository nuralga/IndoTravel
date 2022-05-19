import { timer, setDeadline } from "./modules/control.js";
import './modules/acc.js';
{
    const init = () => {
      const deadline = setDeadline('2022/05/30 18:30');
      timer(deadline);
    };
    window.indoTravel = init;
  }