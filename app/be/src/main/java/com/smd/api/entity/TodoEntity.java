package com.smd.api.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "todo")
public class TodoEntity {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    // @Column(name = "id")
    private Integer id;
    @Column(name = "production_date")
    private Date productionDate;
    @Column(name = "final_deadline")
    private Date finalDeadline;
    // @Column(name = "todo")
    private String todo;
    @Column(name = "is_done")
    private String isDone;
    @Column(name = "priority")
    private String priority;

}
