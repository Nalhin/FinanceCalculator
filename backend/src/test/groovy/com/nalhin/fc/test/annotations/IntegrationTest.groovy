package com.nalhin.fc.test.annotations

import com.nalhin.fc.test.config.TestClockConfig
import org.springframework.context.annotation.Import
import org.springframework.test.context.ActiveProfiles

import java.lang.annotation.ElementType
import java.lang.annotation.Retention
import java.lang.annotation.RetentionPolicy
import java.lang.annotation.Target


@Target([ElementType.TYPE])
@Retention(RetentionPolicy.RUNTIME)
@Import(TestClockConfig.class)
@ActiveProfiles("test")
@interface IntegrationTest {}