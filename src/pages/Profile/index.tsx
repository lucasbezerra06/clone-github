import React from 'react';
import { useParams } from 'react-router';

import { Container, Main, LeftSide, RightSide, Repos, CalendarHeading, RepoIcon, Tab } from './styles';

import ProfileData from '../../components/ProfileData';
import RepoCard from '../../components/RepoCard';
import RandomCalendar from '../../components/RandomCalendar';

import { APIRepo, APIUser } from '../../@types';
import { useFetch } from '../../hooks/useFetch';

interface Data {
    user?: APIUser;
    repos?: APIRepo[];
    error?: string;
}

const Profile: React.FC = () => {

    const { username = 'lucasbezerra06' } = useParams();

    const { data: userData } = useFetch<APIUser>(`https://api.github.com/users/${username}`);
    const { data: reposData } = useFetch<APIRepo[]>(`https://api.github.com/users/${username}/repos`);

    const slicedRepos = reposData?.sort(() => 0.50 - Math.random()).slice(0, 6);

    // const [data, setData] = useState<Data>();

    // useEffect(() => {
    //     Promise.all([
    //         fetch(`https://api.github.com/users/${username}`),
    //         fetch(`https://api.github.com/users/${username}/repos`),
    //     ]).then(async (response) => {
    //         const [userResponse, reposResponse] = response;

    //         if (userResponse.status === 404) {
    //             setData({ error: 'User not found!' });
    //             return;
    //         }

    //         const user = await userResponse.json();
    //         const repos = await reposResponse.json();

    //         const shuffledRepos = repos.sort(() => 0.50 - Math.random());
    //         const slicedRepos = shuffledRepos.slice(0, 6);

    //         setData({
    //             user,
    //             repos: slicedRepos,
    //         });
    //     })
    // }, [username]);

    // if (data?.error) {
    //     return <h1>{data.error}</h1>
    // }

    // if (!data?.user || !data?.repos) {
    //     return <h1>Loading...</h1>
    // }

    if (!userData || !reposData) {
        return <h1>Loading...</h1>
    }

    const TabContent = () => (
        <div className="content">
            <RepoIcon />
            <span className="label">Repositories</span>
            <span className="number">{userData?.public_repos}</span>
        </div>
    );

    return (
        <Container>
            <Tab className="desktop">
                <div className="wrapper">
                    <span className="offset" />
                    <TabContent />
                </div>
                <span className="line" />
            </Tab>
            <Main>
                <LeftSide>
                    <ProfileData
                        username={userData.login}
                        name={userData.name}
                        avatarUrl={userData.avatar_url}
                        followers={userData.followers}
                        following={userData.following}
                        company={userData.company}
                        location={userData.location}
                        email={userData.email}
                        blog={userData.blog}
                    />

                </LeftSide>
                <RightSide>
                    <Tab className="mobile">
                        <TabContent />
                        <span className="line" />
                    </Tab>

                    <Repos>
                        <h2>Random repos</h2>

                        <div>
                            {slicedRepos?.map(item => (
                                <RepoCard
                                    key={item.name}
                                    username={item.owner.login}
                                    reponame={item.name}
                                    description={item.description}
                                    language={item.language}
                                    stars={item.stargazers_count}
                                    forks={item.forks}
                                />
                            ))}
                        </div>
                    </Repos>

                    <CalendarHeading>
                        Random calendar (do not represent actual data)
                    </CalendarHeading>

                    <RandomCalendar />
                </RightSide>
            </Main>
        </Container>
    );
}

export default Profile;