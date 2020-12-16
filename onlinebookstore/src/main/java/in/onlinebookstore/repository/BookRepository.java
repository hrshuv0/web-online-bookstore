package in.onlinebookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import in.onlinebookstore.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long>{

}
