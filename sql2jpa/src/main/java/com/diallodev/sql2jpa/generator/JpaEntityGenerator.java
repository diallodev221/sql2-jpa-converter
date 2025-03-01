package com.diallodev.sql2jpa.generator;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.diallodev.sql2jpa.model.ColumnInfo;
import org.springframework.stereotype.Component;

@Component
public class JpaEntityGenerator {

    private static final Map<String, String> SQL_TO_JAVA_TYPES = new HashMap<>();


    static {
        SQL_TO_JAVA_TYPES.put("VARCHAR", "String");
        SQL_TO_JAVA_TYPES.put("TEXT", "String");
        SQL_TO_JAVA_TYPES.put("CHAR", "String");
        SQL_TO_JAVA_TYPES.put("INT", "Integer");
        SQL_TO_JAVA_TYPES.put("BIGINT", "Long");
        SQL_TO_JAVA_TYPES.put("DOUBLE", "Double");
        SQL_TO_JAVA_TYPES.put("FLOAT", "Float");
        SQL_TO_JAVA_TYPES.put("DECIMAL", "BigDecimal");
        SQL_TO_JAVA_TYPES.put("BOOLEAN", "Boolean");
        SQL_TO_JAVA_TYPES.put("DATE", "LocalDate");
        SQL_TO_JAVA_TYPES.put("DATETIME", "LocalDateTime");
        SQL_TO_JAVA_TYPES.put("TIMESTAMP", "Instant");
    }


    //    public String generateEntity(String tableName, List<String> columns) {
//        StringBuilder entity = new StringBuilder();
//
//        entity.append("import jakarta.persistence.*;\n");
//        entity.append("import lombok.Data;\n\n");
//        entity.append("@Entity\n@Table(name = \"" + tableName + "\")\n@Data\n");
//        entity.append("public class " + capitalize(tableName) + " {\n\n");
//
//        for (String column : columns) {
//            entity.append("    @Column(name = \"" + column + "\")\n");
//            entity.append("    private String " + column.toLowerCase() + ";\n\n");
//        }
//
//        entity.append("}");
//        return entity.toString();
//    }
    public String generateEntity(String tableName, List<ColumnInfo> columns) {
        StringBuilder entity = new StringBuilder();

        entity.append("import jakarta.persistence.*;\n");
        entity.append("import lombok.Data;\n");
        entity.append("import java.math.BigDecimal;\n");
        entity.append("import java.time.*;\n\n");

        entity.append("@Entity\n@Table(name = \"" + tableName + "\")\n@Data\n");
        entity.append("public class " + capitalize(tableName) + " {\n\n");

        for (ColumnInfo column : columns) {
            if (column.isPrimaryKey()) {
                entity.append("    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n");
            }
            entity.append("    @Column(name = \"" + column.getColumnName() + "\")\n");
            entity.append("    private " + getJavaType(column.getSqlType()) + " " + toCamelCase(column.getColumnName()) + ";\n\n");
        }

        entity.append("}");
        return entity.toString();
    }

    private String getJavaType(String sqlType) {
        return SQL_TO_JAVA_TYPES.getOrDefault(sqlType.toUpperCase(), "String");
    }

    private String toCamelCase(String columnName) {
        String[] parts = columnName.split("_");
        StringBuilder camelCase = new StringBuilder(parts[0].toLowerCase());
        for (int i = 1; i < parts.length; i++) {
            camelCase.append(parts[i].substring(0, 1).toUpperCase()).append(parts[i].substring(1).toLowerCase());
        }
        return camelCase.toString();
    }

    private String capitalize(String str) {
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }
}

