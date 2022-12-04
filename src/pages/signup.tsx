import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signupSchema } from '../schemas';
import { trpc } from '../utils/trpc';

const Signup = () => {
    const { register, handleSubmit } = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
    });

    const { mutate: signup } = trpc.user.signup.useMutation();

    return (
        <form onSubmit={(...args) => void handleSubmit(signup)(args)}>
            <input {...register('email')} />
            <input {...register('password')} />
            <input type="submit" />
        </form>
    );
};

export default Signup;
