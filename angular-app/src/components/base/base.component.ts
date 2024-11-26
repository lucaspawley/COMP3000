import { AccountService } from '../../services/account.service';

export class BaseComponent {
  constructor(protected accountService: AccountService) {};
}
