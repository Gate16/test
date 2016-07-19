package nz.co.airnz.govhack2016.test.repository;

import nz.co.airnz.govhack2016.test.domain.Authority;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Authority entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
