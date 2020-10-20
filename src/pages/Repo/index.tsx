import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Breadcrumb, RepoIcon, Stats, StarIcon, ForkIcon, LinkButton, GithubIcon, } from './styles';

const Repo: React.FC = () => {
  return (
    <Container>
      <Breadcrumb>
        <RepoIcon />

        <Link className={'username'} to={'/lucasbezerra06'}>
          lucasbezerra06
        </Link>

        <span>/</span>

        <Link className={'reponame'} to={'/lucasbezerra06/burger-builder'}>
          youtube-content
        </Link>
      </Breadcrumb>

      <p>Burguer Builder</p>

      <Stats>
        <li>
          <StarIcon />
          <b>9</b>
          <span>stars</span>
        </li>
        <li>
          <ForkIcon />
          <b></b>
          <span>forks</span>
        </li>
      </Stats>

      <LinkButton href={'https://github.com/lucasbezerra06/burger-builder'}>
        <GithubIcon />
        <span>View on GitHub</span>
      </LinkButton>
    </Container>
  );
}

export default Repo;