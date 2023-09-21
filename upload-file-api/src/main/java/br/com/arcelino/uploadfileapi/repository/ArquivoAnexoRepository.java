package br.com.arcelino.uploadfileapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.arcelino.uploadfileapi.api.FileWithDescriptionResponse;
import br.com.arcelino.uploadfileapi.entity.ArquivoAnexo;

public interface ArquivoAnexoRepository extends JpaRepository<ArquivoAnexo, Integer> {

    @Query("""
            select new br.com.arcelino.uploadfileapi.api.FileWithDescriptionResponse(
                file.id as id,
                file.nome as filename,
                file.descricao as description
            )
            from ArquivoAnexo file
            order by file.id desc
                """)
    List<FileWithDescriptionResponse> findAllProjectedBy();

}
