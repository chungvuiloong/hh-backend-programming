package bookstore.bookstore.service;

import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import bookstore.bookstore.model.User;
import bookstore.bookstore.repository.UserRepository;

@Service
public class UserDetailServiceImpl implements UserDetailsService {
    private final UserRepository repository;

    public UserDetailServiceImpl(UserRepository userRepository) {
        this.repository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User currentUser = repository.findByUsername(username);

        if (currentUser == null) {
            throw new UsernameNotFoundException("User not found: " + username);
        }

        UserDetails user = new org.springframework.security.core.userdetails.User(username,
                currentUser.getPasswordHash(),
                AuthorityUtils.createAuthorityList("ROLE_" + currentUser.getRole()));
        return user;
    }
}