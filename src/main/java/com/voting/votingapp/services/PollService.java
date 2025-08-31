package com.voting.votingapp.services;

import com.voting.votingapp.model.Poll;
import org.springframework.stereotype.Service;
import com.voting.votingapp.repository.PollRepository;

@Service
public class PollService {
    private final PollRepository pollRepository;

    public PollService(PollRepository pollRepository) {
        this.pollRepository = pollRepository;
    }

    public Poll createPoll(Poll poll) {
        return pollRepository.save(poll);
    }
}
