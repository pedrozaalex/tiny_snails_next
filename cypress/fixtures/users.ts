import { User } from '@prisma/client';

const DEFAULT_USERS: User[] = [
    {
        id: '123',
        name: 'John Doe',
        email: 'john.doe@email.com',
        emailVerified: new Date('2021-01-01'),
        image: 'https://example.com/image.png',
    },
];

export default DEFAULT_USERS;
