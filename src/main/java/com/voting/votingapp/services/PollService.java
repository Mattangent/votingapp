package com.voting.votingapp.services;

import com.voting.votingapp.model.Poll;
import org.springframework.stereotype.Service;

@Service
public class PollService {

    public Poll createPoll(Poll poll) {
        return poll;
//        return pollRepository.save(poll);
    }
}
