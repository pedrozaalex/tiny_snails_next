import { ProjectRepoLink } from './ProjectRepoLink';

export function Footer() {
    return (
        <footer className="footer footer-center mt-auto mb-4 border-y-2 border-black bg-base-100 p-4 align-middle text-base-content">
            <p>
                Copyright © 2022 - All right reserved by ACME Industries Ltd
                <ProjectRepoLink />
            </p>
        </footer>
    );
}
