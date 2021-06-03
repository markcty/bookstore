package com.bookstore.backend.utils;

import java.io.IOException;
import java.util.Date;

import com.aliyun.oss.OSS;
import com.google.common.io.Files;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@Service
public class OssUtils {

  @Autowired
  private OSS ossClient;

  private final static String bucketName = "bookstore-image-server";

  private final static String bucketURL = "https://bookstore-image-server.oss-cn-shanghai.aliyuncs.com/";

  public void createBucket() {
    if (!ossClient.doesBucketExist(bucketName))
      ossClient.createBucket(bucketName);
  }

  public String uploadBookCover(MultipartFile cover) {
    String key = Long.toString(new Date().getTime()) + "." + Files.getFileExtension(cover.getOriginalFilename());
    try {
      ossClient.putObject(bucketName, key, cover.getInputStream());
    } catch (IOException e) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "upload cover failed");
    }
    return bucketURL + key;
  }
}
