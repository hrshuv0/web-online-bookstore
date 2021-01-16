package in.onlinebookstore.config;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.Type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

@Configuration
public class RepositoryConfig implements RepositoryRestConfigurer {

	@Autowired
	private EntityManager entitymanager;

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {

		config.exposeIdsFor(
				entitymanager.getMetamodel().getEntities().stream()
				.map(Type::getJavaType).toArray(Class[]::new));
		
		config.getCorsRegistry()
		.addMapping("/**")
		.allowedOrigins("http://127.0.0.1:4200");

	}

}
