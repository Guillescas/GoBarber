// import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPassowordEmailService from './SendForgotPassowordEmailService';

describe('SendForgotPasswordEmail', () => {
  it('Should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPasswordEmail = new SendForgotPassowordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '123123',
    });

    await sendForgotPasswordEmail.execute({
      email: 'john.doe@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });
});
