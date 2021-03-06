import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(
    title: string,
    value: number,
    type: 'income' | 'outcome',
  ): Transaction {
    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();
      if (value > balance.total) {
        throw Error('Insufficient funds');
      }
    }

    return this.transactionsRepository.create(title, value, type);
  }
}

export default CreateTransactionService;
